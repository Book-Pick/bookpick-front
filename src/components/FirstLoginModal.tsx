import { useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/shared/ui/alert-dialog'

interface FirstLoginModalProps {
  open: boolean
  onClose: () => void
}

export default function FirstLoginModal({ open, onClose }: FirstLoginModalProps) {
  const navigate = useNavigate()

  const handleSetupClick = () => {
    onClose()
    navigate('/onboarding/reading-preference')
  }

  const handleLaterClick = () => {
    onClose()
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center'>
            당신만을 위한 책장을 만들어볼까요?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            독서취향을 설정하고
            <br />
            맞춤 추천사를 받아보세요
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex-row justify-center gap-2 sm:justify-center'>
          <AlertDialogCancel onClick={handleLaterClick}>다음에 할게요</AlertDialogCancel>
          <AlertDialogAction onClick={handleSetupClick}>좋아요</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
