import { withInstall } from '~/util'
import Tabs from './tabs.vue'

export * from './interface'
export * from './constants'
export type TabsInstance = InstanceType<typeof Tabs>
export const PTabs = withInstall(Tabs)
export default PTabs
