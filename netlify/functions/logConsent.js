const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  // Parse the incoming request body
  const data = JSON.parse(event.body);
  const { timestamp, page } = data;

  try {
    // Insert the consent data into Supabase
    const { error } = await supabase.from('consents').insert([
      { timestamp, page_url: page, user_agent: event.headers['user-agent'] }
    ]);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to log consent' }),
      };
    }

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
