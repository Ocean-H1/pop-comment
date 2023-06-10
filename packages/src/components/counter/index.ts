import { withInstall } from '~/util'
import Counter from './counter.vue'

export type CounterInstance = InstanceType<typeof Counter>
export const PCounter = withInstall(Counter)
export default PCounter
