/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteEvent, getAllEvents } from "../../api/api";
import "../../components/layout/layout.css";

interface Event {
  _id: string;
  name: string;
  mode: "Online" | "Offline" | "Hybrid";
  description: string;
  image: string;
  status: "active" | "inactive";
  createdAt: string;
}

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Base URL for images (same as your API)
  const IMAGE_BASE_URL = "https://api.wekonnects.com/api/v1";

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEvents();

      // Correct path: response.data.data (not .events)
      const eventsData = response.data?.data || [];
      setEvents(eventsData);
    } catch (error: any) {
      console.error("Fetch events error:", error);
      toast.error(error.response?.data?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      setDeletingId(id);
      await deleteEvent(id);
      toast.success("Event deleted successfully");
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  const getModeBadgeClass = (mode: string) => {
    switch (mode) {
      case "Online": return "badge-online";
      case "Offline": return "badge-offline";
      case "Hybrid": return "badge-hybrid";
      default: return "badge-default";
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="loading-spinner">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1 className="page-title">All Events</h1>
        <p className="page-subtitle">
          {events.length} Event{events.length !== 1 ? "s" : ""} Found
        </p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">No events yet</div>
          <p>No events have been created. Create your first event!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-image-wrapper">
                <img
                  src={`${IMAGE_BASE_URL}/${event.image}`}
                  alt={event.name}
                  className="event-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback-event.jpg";
                  }}
                />
                <span className={`event-mode-badge ${getModeBadgeClass(event.mode)}`}>
                  {event.mode}
                </span>
              </div>

              <div className="event-content">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-description">
                  {event.description.length > 120
                    ? `${event.description.substring(0, 120)}...`
                    : event.description}
                </p>

                <div className="event-meta">
                  <span className="event-date">
                    {new Date(event.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className={`event-status ${event.status}`}>
                    {event.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="event-actions">
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(event._id)}
                    disabled={deletingId === event._id}
                  >
                    {deletingId === event._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;