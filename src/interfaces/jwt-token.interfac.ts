export default interface JwtTokensInterface {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roles: string;
  readonly access_token: string;
  readonly refresh_token?: string;
  readonly message: string;
}
