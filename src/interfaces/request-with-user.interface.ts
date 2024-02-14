import { User } from '../modules/users/schema/user.schema';

export default interface RequestWithUserInterface extends Request {
  readonly user: User;
}
