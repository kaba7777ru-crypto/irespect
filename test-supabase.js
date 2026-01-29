// Quick test for Supabase connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ebehihysbaycfmklfiwd.supabase.co';
const supabaseKey = 'sb_publishable_wNbis2eP3guE9T6fygSA8w_MXZm9IAi';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Get businesses
    const { data: businesses, error: businessError } = await supabase
      .from('businesses')
      .select('*');

    if (businessError) throw businessError;

    console.log('✅ Businesses table:', businesses.length, 'rows');
    businesses.forEach(b => console.log(`   - ${b.name}: €${b.revenue_monthly}/mo, ${b.users_count} users`));

    // Test 2: Get AI agents
    const { data: agents, error: agentError } = await supabase
      .from('ai_agents')
      .select('*');

    if (agentError) throw agentError;

    console.log('\n✅ AI Agents table:', agents.length, 'agents');
    agents.forEach(a => console.log(`   - ${a.name}: ${a.status}, quality ${a.quality_score}/10`));

    // Test 3: Get decisions
    const { data: decisions, error: decisionError } = await supabase
      .from('decisions')
      .select('*');

    if (decisionError) throw decisionError;

    console.log('\n✅ Decisions table:', decisions.length, 'pending');
    decisions.forEach(d => console.log(`   - ${d.title} (${d.priority})`));

    console.log('\n🎉 All tests passed! Supabase is connected and working!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
