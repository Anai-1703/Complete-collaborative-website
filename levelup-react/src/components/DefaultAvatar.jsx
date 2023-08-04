import DefaultAvatarSvg from '../assets/svg/Default-avatar.svg';

export function DefaultAvatar({ post }) {
    const className = post ? 'user-avatar' : 'user-avatar-full';

    return <img className={className} src={DefaultAvatarSvg} alt="Avatar" />;
}