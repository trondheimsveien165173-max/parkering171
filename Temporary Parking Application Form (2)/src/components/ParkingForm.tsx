import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ParkingApplication } from '../App';

interface ParkingFormProps {
  selectedDates: Date[];
  onSubmit: (application: Omit<ParkingApplication, 'id' | 'submittedAt'>) => void;
}

export function ParkingForm({ selectedDates, onSubmit }: ParkingFormProps) {
  const [formData, setFormData] = useState({
    reason: '',
    unitNumber: '',
    licensePlate: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDates.length === 0) {
      toast.error('Vennligst velg minst én dato fra kalenderen');
      return;
    }

    const unitNum = parseInt(formData.unitNumber);
    if (isNaN(unitNum) || unitNum < 1 || unitNum > 65) {
      toast.error('Leilighetsnummer må være mellom 1 og 65');
      return;
    }

    // Submit the form
    onSubmit({
      dates: selectedDates,
      ...formData,
    });

    // Show success notification
    toast.success('Parkeringssøknad sendt inn!', {
      description: `Din forespørsel for ${selectedDates.length} ${selectedDates.length === 1 ? 'dag' : 'dager'} er mottatt.`,
    });

    // Reset form
    setFormData({
      reason: '',
      unitNumber: '',
      licensePlate: '',
      name: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-900 mb-6">Søknadsdetaljer</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="reason" className="block text-gray-900 mb-2">
            Grunn for parkering *
          </label>
          <textarea
            id="reason"
            name="reason"
            required
            rows={3}
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Skriv inn grunn for parkeringsforespørselen"
          />
        </div>

        <div>
          <label htmlFor="unitNumber" className="block text-gray-900 mb-2">
            Aksje-/Eiendomsnummer (Leilighetsnummer) *
          </label>
          <input
            type="number"
            id="unitNumber"
            name="unitNumber"
            required
            min="1"
            max="65"
            value={formData.unitNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="f.eks. 12"
          />
        </div>

        <div>
          <label htmlFor="licensePlate" className="block text-gray-900 mb-2">
            Bilens Registreringsnummer *
          </label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            required
            value={formData.licensePlate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="f.eks. AB 12345"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-900 mb-2">
            Navn *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Skriv inn ditt fulle navn"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-900 mb-2">
            Telefonnummer *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="f.eks. 123 45 678"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-900 mb-2">
            E-postadresse *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="din.epost@eksempel.no"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send inn søknad
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          <strong>Merk:</strong> I et produksjonsmiljø ville dette automatisk sendt dataene dine til Google Sheets og varslet eiendomsforvaltningen.
        </p>
      </div>
    </div>
  );
}