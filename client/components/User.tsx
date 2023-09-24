import { IUser } from "@/types/types";
import Avatar from "./Avatar";

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps) => {
  return (
    <div className="mb-2 last-of-type:mb-0 border-b border-border-color last-of-type:border-none pb-2">
      <a
        className="flex items-center justify-start gap-2"
        title={user.name.toLowerCase()}
        href={`/${user.id}`}
      >
        <Avatar image={user.image} width={"50px"} />
        <p className="text-sm font-medium ">@{user?.name.toLowerCase()}</p>
      </a>
    </div>
  );
};

export default User;
