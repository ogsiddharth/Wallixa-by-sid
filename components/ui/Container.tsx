type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-10 xl:px-16">
      {children}
    </div>
  );
}