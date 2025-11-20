import { useState } from 'react';
import { ParkingCalendar } from './components/ParkingCalendar';
import { ParkingForm } from './components/ParkingForm';
import { Toaster } from 'sonner@2.0.3';

export interface ParkingApplication {
  id: string;
  dates: Date[];
  reason: string;
  unitNumber: string;
  licensePlate: string;
  name: string;
  phone: string;
  email: string;
  submittedAt: Date;
}

export default function App() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [applications, setApplications] = useState<ParkingApplication[]>([]);

  const handleSubmit = (application: Omit<ParkingApplication, 'id' | 'submittedAt'>) => {
    const newApplication: ParkingApplication = {
      ...application,
      id: Date.now().toString(),
      submittedAt: new Date(),
    };
    
    setApplications([...applications, newApplication]);
    setSelectedDates([]);
    
    // Here you would integrate with Google Sheets API
    // Example: await sendToGoogleSheets(newApplication);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-gray-900 mb-2">Søknad om Midlertidig Parkering</h1>
          <p className="text-gray-600">Velg datoer og send inn din parkeringsforespørsel</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ParkingCalendar 
              selectedDates={selectedDates}
              onSelectDates={setSelectedDates}
            />
          </div>

          <div>
            <ParkingForm 
              selectedDates={selectedDates}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        {applications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-gray-900 mb-4">Nylige Søknader</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-900">Dato(er)</th>
                      <th className="px-6 py-3 text-left text-gray-900">Navn</th>
                      <th className="px-6 py-3 text-left text-gray-900">Enhet</th>
                      <th className="px-6 py-3 text-left text-gray-900">Registreringsnummer</th>
                      <th className="px-6 py-3 text-left text-gray-900">Grunn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 text-gray-900">
                          {app.dates.length === 1 
                            ? app.dates[0].toLocaleDateString('nb-NO')
                            : `${app.dates.length} dager`
                          }
                        </td>
                        <td className="px-6 py-4 text-gray-900">{app.name}</td>
                        <td className="px-6 py-4 text-gray-900">{app.unitNumber}</td>
                        <td className="px-6 py-4 text-gray-900">{app.licensePlate}</td>
                        <td className="px-6 py-4 text-gray-600">{app.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}