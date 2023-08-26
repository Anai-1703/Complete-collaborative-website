import DefaultAvatarSvg from '../assets/svg/default-avatar.svg';

export function DefaultAvatar({ size }) {
    const className = size ? 'user-avatar' : 'user-avatar-full';

    return <img className={className} src={DefaultAvatarSvg} alt="Avatar" />;
}