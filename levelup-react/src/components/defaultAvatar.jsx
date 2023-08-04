import defaultAvatarSvg from '../assets/svg/default-avatar.svg';

export function DefaultAvatar({ post }) {
    const className = post ? 'user-avatar' : 'user-avatar-full';

    return <img className={className} src={defaultAvatarSvg} alt="Avatar" />;
}
