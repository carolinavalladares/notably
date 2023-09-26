import { IUser } from "@/types/types";
import Avatar from "./Avatar";
import formatHandle from "@/utils/formatHandle";

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps) => {
  return (
    <div className="mb-2 last-of-type:mb-0 border-b border-border-color last-of-type:border-none pb-2">
      <a
        className="flex items-center justify-start gap-2"
        title={user.name}
        href={`/${user.id}`}
      >
        <Avatar image={user.image} width={"50px"} />

        <div>
          <p className="font-medium text-sm capitalize">{user.name}</p>
          <p className="text-xs ">{formatHandle(user.name)}</p>
        </div>
      </a>
    </div>
  );
};

export default User;
