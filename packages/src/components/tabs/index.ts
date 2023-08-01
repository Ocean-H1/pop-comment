import { withInstall } from '~/util'
import Tabs from './tabs.vue'

export type TabsInstance = InstanceType<typeof Tabs>
export const PTabs = withInstall(Tabs)
export default PTabs
