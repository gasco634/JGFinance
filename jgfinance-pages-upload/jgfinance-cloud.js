(function () {
  const config = window.JGFINANCE_SUPABASE_CONFIG || {};
  let client = null;
  let failure = null;
  const configured = /^https:\/\//i.test(config.url || '') && Boolean(config.publishableKey);
  let readyPromise = null;

  async function initialize() {
    if (!configured) return false;
    if (client) return true;
    if (!readyPromise) readyPromise = (async () => {
      try {
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
        client = createClient(config.url, config.publishableKey, {
          auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
        });
        failure = null;
        return true;
      } catch (error) {
        failure = error;
        readyPromise = null;
        return false;
      }
    })();
    return readyPromise;
  }

  async function requireClient() {
    if (!(await initialize()) || !client) throw failure || new Error('Cloud backup is not configured.');
    return client;
  }

  window.JGFinanceCloud = {
    get ready() { return initialize(); },
    configured,
    async signUp(email, password, name) {
      const supabase = await requireClient();
      return supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    },
    async signIn(email, password) {
      const supabase = await requireClient();
      return supabase.auth.signInWithPassword({ email, password });
    },
    async signOut() {
      const supabase = await requireClient();
      return supabase.auth.signOut();
    },
    async currentUser() {
      const supabase = await requireClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session?.user || null;
    },
    async getBackup(userId) {
      const supabase = await requireClient();
      return supabase.from('jgfinance_backups').select('payload,updated_at').eq('user_id', userId).maybeSingle();
    },
    async saveBackup(userId, payload) {
      const supabase = await requireClient();
      return supabase.from('jgfinance_backups').upsert({
        user_id: userId,
        payload,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    },
    subscribe(userId, onBackup, onState) {
      if (!client) return null;
      return client.channel(`jgfinance-backup-${userId}`)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'jgfinance_backups', filter: `user_id=eq.${userId}`
        }, change => {
          if (change.new && change.new.payload) onBackup(change.new.payload, change.new.updated_at);
        })
        .subscribe(status => { if (onState) onState(status); });
    },
    async unsubscribe(channel) {
      if (client && channel) await client.removeChannel(channel);
    }
  };
})();
