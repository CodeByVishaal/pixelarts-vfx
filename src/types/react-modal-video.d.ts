declare module 'react-modal-video' {
    import { Component } from 'react';

    interface ModalVideoProps {
        channel: 'youtube' | 'vimeo' | 'custom';
        isOpen: boolean;
        videoId: string;
        onClose: () => void;
    }

    export default class ModalVideo extends Component<ModalVideoProps> {}
}