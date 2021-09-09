import { CommandBusProvider, TransactionalBus } from '@infrastructure/cqrs/transactional.bus';

export default [CommandBusProvider, TransactionalBus];
