
const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    "975262382143-1cjiuoql5491duu1808jnjp2tj8t34lm.apps.googleusercontent.com",
    "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",
    "https://www.google.com"
  );
const scopes = [
    'https://www.googleapis.com/auth/youtube',
    
  ];
const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });
console.log(url)
// const {tokens} = await oauth2Client.getToken(code)
// console.log(tokens)

// oauth2Client.setCredentials(tokens);
const authorizationCode = decodeURIComponent("4%2F0AfJohXm5Fn2j3LiYdKEBrl7tLlo0dugpmznd9FY5aQ50SYL4pmTCZM6XG9kxgSd7srHUHg")
console.log(authorizationCode)