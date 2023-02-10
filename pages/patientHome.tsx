import { MainLayout } from '../components/layouts/mainLayout'

export default function PatientHomePage() {
  return (
    <MainLayout userType="PATIENT">
      <h1 className="text-3xl">This is the patient home page</h1>
    </MainLayout>
  )
}
