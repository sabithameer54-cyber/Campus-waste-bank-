import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Sparkles, Check, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  category: 'Hackathon' | 'Symposium' | 'Green Drive' | 'Cultural';
  description: string;
  rsvpd?: boolean;
}

const EVENTS: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'University Green Hackathon & E-Waste Swap Marathon',
    organizer: 'Campus Waste Bank & IEEE Chapter',
    date: '2026-09-25 (Friday)',
    time: '9:00 AM - 6:00 PM',
    venue: 'Main Block Auditorium & Library Quad',
    category: 'Green Drive',
    description: 'Bring old laptops, circuit boards, and textbooks. Compete in building IoT circular gadgets and earn +30 Green Points.',
    rsvpd: true,
  },
  {
    id: 'ev-2',
    title: 'National Level Technical Symposium "Technovate 2026"',
    organizer: 'Departments of CSE & ECE',
    date: '2026-10-08',
    time: '10:00 AM - 5:00 PM',
    venue: 'Convention Centre Hall A',
    category: 'Symposium',
    description: 'Paper presentations, code debugging marathons, CAD design war, and project expo with cash awards worth ₹75,000.',
    rsvpd: false,
  },
  {
    id: 'ev-3',
    title: 'Campus Book Exchange & Senior-Junior Meetup',
    organizer: 'Central Library Committee',
    date: '2026-09-28',
    time: '2:00 PM - 5:00 PM',
    venue: 'Digital Library Reading Foyer',
    category: 'Cultural',
    description: 'Seniors handover semester reference manuals, question banks, and scientific calculators directly to 1st & 2nd year juniors.',
    rsvpd: false,
  },
];

export const EventHubTab: React.FC = () => {
  const { showToast } = useApp();
  const [eventsList, setEventsList] = useState<CampusEvent[]>(EVENTS);

  const toggleRsvp = (id: string) => {
    setEventsList(
      eventsList.map((e) => {
        if (e.id === id) {
          const next = !e.rsvpd;
          showToast(
            next
              ? `RSVP Confirmed for "${e.title}". Calendar invite generated.`
              : `RSVP Cancelled for "${e.title}".`
          );
          return { ...e, rsvpd: next };
        }
        return e;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-green-800 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-green-600" />
            <span>Campus Gatherings & Symposia</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Campus Event Hub & Activity Registrations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            RSVP for upcoming technical symposiums, eco campaigns, book exchange fairs, and university hackathons.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventsList.map((event) => (
          <div
            key={event.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-green-300 shadow-2xs hover:shadow-xs transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
                  {event.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">{event.organizer}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{event.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-green-700" />
                  <span className="font-bold text-slate-800">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <button
                onClick={() => toggleRsvp(event.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  event.rsvpd
                    ? 'bg-green-50 border border-green-300 text-green-900 hover:bg-green-100'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                {event.rsvpd ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>RSVP Confirmed</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Register / RSVP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
