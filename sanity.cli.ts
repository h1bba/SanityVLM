import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '01t7fkjc',
    dataset: 'production',
  },
  deployment: {
    appId: 'uvwo1dfjrh9b1bfgp2e1tfkq',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
