interface IHelpProps extends IApkProps {
    width: number
    height: number
    preImgUrl?: string
    textInfo?: Array<string>
}

interface IApkProps {
    name: number
    title: string
}

interface IInfoItem {
    android?: string
    ios?: string
}

export type {IApkProps, IHelpProps, IInfoItem}