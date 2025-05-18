export const confirmEmailTemplate = (confirmationUrl) => {
  return `
    <html>
      <body>
        <h2>Confirm your email</h2>
        <p>Click the button below to confirm your subscription to weather updates.</p>
        <a href="${confirmationUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirm Email</a>
      </body>
    </html>
  `;
};

export const weatherReportTemplate = (
  { temperature, humidity, description },
  unsubscribeUrl,
  city
) => {
  return `
    <html>
      <body>
        <h2>Weather Update for ${city || 'Unknown'}</h2>
        <ul>
          <li><strong>Temperature:</strong> ${temperature}°C</li>
          <li><strong>Humidity:</strong> ${humidity}%</li>
          <li><strong>Condition:</strong> ${description}</li>
        </ul>
        <p>Stay tuned for the next update. Have a great day!</p>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
          If you no longer wish to receive weather updates, you can 
          <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">unsubscribe here</a>.
        </p>
      </body>
    </html>
  `;
};

export const confirmationSuccessTemplate = (unsubscribeUrl) => {
  return `
    <html>
      <body>
        <h2>Email confirmed!</h2>
        <p>Thank you for confirming your email. You will now receive weather updates based on your subscription.</p>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
          If you no longer wish to receive weather updates, you can 
          <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">unsubscribe here</a>.
        </p>
      </body>
    </html>
  `;
};

export const unsubscribeSuccessTemplate = () => {
  return `
    <html>
      <body>
        <h2>You have unsubscribed</h2>
        <p>You have successfully unsubscribed from weather updates. We're sorry to see you go.</p>
      </body>
    </html>
  `;
};
