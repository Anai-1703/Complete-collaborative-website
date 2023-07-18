import PropTypes from "prop-types";
import defaultAvatarSvg from "../assets/svg/default-avatar.svg";

export function DefaultAvatar({ border }) {
  const className = border ? "user-avatar" : "user-avatar-full";

  return <img className={className} src={defaultAvatarSvg} alt="Avatar" />;
}
DefaultAvatar.propTypes = {
  border: PropTypes.bool,
};
