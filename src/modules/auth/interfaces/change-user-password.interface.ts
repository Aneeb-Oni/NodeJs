export default interface changeUserPasswordInterface {
  readonly token: string;
  readonly email: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}
