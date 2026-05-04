import { VehicleStats } from "../types";

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
export const DVLA_API_KEY = 'IZgHBWh62y6Q4boIe2xif4aCqHJkPhjR1T0XVXC3';
// Note: We use a CORS proxy because the DVLA API does not support client-side (browser) calls directly.
// In a production environment, you should call this API from your own backend server.
const CORS_PROXY = 'https://corsproxy.io/?';
const DVLA_API_URL = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';

export const getVehicleStats = async (reg: string): Promise<VehicleStats> => {
  // 1. Validate Input
  if (!reg) throw new Error("Registration is required");
  const cleanReg = reg.replace(/\s/g, '').toUpperCase();

  try {
    // 2. Make API Request to DVLA via Proxy
    // We append the target URL to the proxy URL
    const response = await fetch(`${CORS_PROXY}${DVLA_API_URL}`, {
      method: 'POST',
      headers: {
        'x-api-key': DVLA_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ registrationNumber: cleanReg })
    });

    // 3. Handle HTTP Errors
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Vehicle not found. Please contact Chris directly for a custom quote.");
        }
        if (response.status === 403) {
            throw new Error("API Key invalid or quota exceeded.");
        }
        // Generic error fallback
        throw new Error(`Lookup failed (${response.status}). Please contact us directly.`);
    }

    const data = await response.json();

    // 4. Map API Response to App Interface
    // DVLA error objects sometimes come inside 200 OK or 400 bad requests depending on proxy handling
    if (data.errors) {
        throw new Error("Vehicle not found. Please contact Chris directly for a custom quote.");
    }

    const make = data.make || 'Unknown Make';
    const fuelType = data.fuelType || 'Unknown Fuel';
    const capacity = data.engineCapacity; // e.g. 1995
    const year = data.yearOfManufacture;

    // 5. Estimate Stats
    // Since DVLA does not provide HP/Torque, we estimate a base figure from the engine capacity
    // so the user sees a "Result" with calculated gains.
    
    let baseBhp = 120; // Default fallback
    
    if (capacity) {
        // Simple heuristic for estimation: approx 1 BHP per 13.5cc (conservative average)
        baseBhp = Math.round(capacity / 13.5);
    }
    
    // Torque is typically higher than BHP in turbo cars
    const baseTorque = Math.round(baseBhp * 1.6); 

    // 6. Calculate Stage 1 Gains (25% Logic)
    const tunedBhp = Math.round(baseBhp * 1.25);
    const tunedTorque = Math.round(baseTorque * 1.25);

    return {
      vehicleName: `${make} ${year ? year : ''} (Reg: ${cleanReg})`,
      engine: `${capacity ? `${capacity}cc` : ''} ${fuelType}`,
      originalBhp: baseBhp,
      tunedBhp: tunedBhp,
      originalTorque: baseTorque,
      tunedTorque: tunedTorque
    };

  } catch (error: any) {
    console.error("API Lookup Error:", error);
    // If it's a network error (likely still CORS issues if proxy fails), give a helpful message
    if (error.message === 'Failed to fetch') {
        throw new Error("Network error. This may be a CORS issue. Please try a browser extension 'Allow CORS' or contact Chris.");
    }
    throw new Error(error.message || "Vehicle not found. Please contact Chris directly for a custom quote.");
  }
};