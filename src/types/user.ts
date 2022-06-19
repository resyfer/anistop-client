enum Role {
  OWNER,
  ADMIN,
  MODERATOR,
  UPLOADER,
  USER,
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  imgUrl: string;
  role: Role;
  dob: string;
}

export type { Role, User };
