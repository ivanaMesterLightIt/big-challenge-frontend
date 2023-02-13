import { MainLayout } from '../components/layouts/mainLayout'

export default function DoctorHomePage() {
  return (
    <MainLayout userType="DOCTOR">
      <h1 className="text-3xl">This is the doctor home page</h1>
    </MainLayout>
  )
}
