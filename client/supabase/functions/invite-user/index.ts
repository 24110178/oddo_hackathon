import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const { email, role, manager_id } = await req.json();

  try {
    // Create the admin client with the service_role_key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Invite the user
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
    if (error) throw error;

    // TODO: Update the invited user's profile with their role and manager.
    // This is more advanced and may require a separate function or trigger.

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }, status: 200,
    });
  } catch (error) {
    return new Response(String(error?.message ?? error), { status: 500 });
  }
});