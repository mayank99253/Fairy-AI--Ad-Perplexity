

export const AlreadyVerifiedHtml = (loginUrl) => {
    const alreadyVerifiedEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Already Verified</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

    <div style="background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); max-width: 440px; width: 100%; text-align: center; box-sizing: border-box; border: 1px solid #e2e8f0; margin: 20px;">
        
        <div style="background-color: #eff6ff; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
            <svg style="width: 32px; height: 32px; color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>

        <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
            Already Verified!
        </h1>

        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
            Your account is already verified. There is no need to verify it again. Please proceed to the login page.
        </p>

        <a href="${loginUrl}" style="display: block; background-color: #4f46e5; color: #ffffff; padding: 14px 24px; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; transition: background-color 0.2s ease; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
            Go to Login
        </a>

        <p style="color: #94a3b8; font-size: 13px; margin: 32px 0 0 0;">
            Need help? Contact our <a href="mailto:support@yourdomain.com" style="color: #4f46e5; text-decoration: none; font-weight: 500;">support team</a>.
        </p>
    </div>

</body>
</html>
`;
    return alreadyVerifiedEmail
}

export const VerifiedUserEmail = (loginUrl) => {
    const verifiedUser = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verified</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
    
        <div style="background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); max-width: 440px; width: 100%; text-align: center; box-sizing: border-box; border: 1px solid #e2e8f0; margin: 20px;">
            
            <div style="background-color: #f0fdf4; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
                <svg style="width: 32px; height: 32px; color: #16a34a;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
    
            <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
                Account Verified!
            </h1>
    
            <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
                Thanks for connecting with us! Your email has been successfully verified, and your account is ready. You can now log in to your dashboard.
            </p>
    
            <a href="${loginUrl}" style="display: block; background-color: #4f46e5; color: #ffffff; padding: 14px 24px; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; transition: background-color 0.2s ease; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
                Log In to Your Account
            </a>
    
            <p style="color: #94a3b8; font-size: 13px; margin: 32px 0 0 0;">
                Need help? Contact our <a href="mailto:support@yourdomain.com" style="color: #4f46e5; text-decoration: none; font-weight: 500;">support team</a>.
            </p>
        </div>
    
    </body>
    </html>
    `;

    return verifiedUser
}


