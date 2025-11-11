import type { User } from "@/features/saerok/CollectionType";

interface NicknameBadgeProps {
  user: User;
  scale?: number;
}

const NicknameBadge = ({ user, scale = 1 }: NicknameBadgeProps) => {
  return (
    <div
      className="absolute glassmorphism flex flex-row items-center"
      style={{
        top: `${10 * scale}px`,
        right: `${10 * scale}px`,
        borderRadius: `${20 * scale}px`,
        paddingLeft: `${10 * scale}px`,
        paddingRight: `${12 * scale}px`,
        paddingTop: `${7 * scale}px`,
        paddingBottom: `${7 * scale}px`,
        gap: `${7 * scale}px`,
      }}
    >
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="rounded-full border-1 border-background-lightWhitegray object-cover"
        style={{
          height: `${25 * scale}px`,
          width: `${25 * scale}px`,
        }}
      />
      <span
        className="font-400 text-font-black"
        style={{
          fontSize: `${15 * scale}px`,
          lineHeight: `${20 * scale}px`,
        }}
      >
        {user.nickname}
      </span>
    </div>
  );
};

export default NicknameBadge;
