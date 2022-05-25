const googleAuthConfig = {
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY
  },
  clientOptions: {
    clientId: process.env.CLIENT_ID,
    keyId: process.env.PRIVATE_KEY_ID,
  },
}
export default googleAuthConfig;