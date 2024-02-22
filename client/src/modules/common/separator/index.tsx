export interface Props {
  size?: 'small' | 'medium' | 'big';
}

export const Separator = (props: Props) => {
  const { size } = props;
  const paddingValue = size === 'small' ? 5 : size === 'big' ? 20 : 10;
  return <div style={{ padding: paddingValue }}></div>;
};
