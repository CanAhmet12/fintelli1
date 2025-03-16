interface Props {
  message: string
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Hata! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  )
} 