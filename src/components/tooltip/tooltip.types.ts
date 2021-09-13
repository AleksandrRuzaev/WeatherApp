export interface ITooltipProps {
    children?: React.ReactNode;
    isTooltipActive?: boolean;
    maxWidth?: number;
    message?: string;
    className?: string;
}

export interface ITooltipState {
    hoverStatus: boolean;
    top: number;
    left: number;
}
