import { CommandBusProvider, TransactionalBus } from '@infrastructure/cqrs/transactional.bus';
import { ActivityClientProvider } from '@infrastructure/service/bored.api.client';

export default [CommandBusProvider, TransactionalBus, ActivityClientProvider];
