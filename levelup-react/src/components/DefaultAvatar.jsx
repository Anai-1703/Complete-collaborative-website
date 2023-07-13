import defaultAvatarSvg from '../assets/svg/default-avatar.svg';

export function DefaultAvatar() {
    return (
        <img className="user-avatar" src={defaultAvatarSvg} alt="Avatar" />
    );
}
