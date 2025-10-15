// Mock data for different time periods
// Replace this with your actual API calls when integrating backend

export type TimeFilter = "today" | "this week" | "this month" | "this year";

export type OverviewDataType = {
  orders: { value: number; growthRate: number };
  sales: { value: number; growthRate: number };
  revenue: { value: number; growthRate: number };
  products: { value: number; growthRate: number };
  users: { value: number; growthRate: number };
};

// Simulate API call - replace this with your actual API endpoint
export async function fetchOverviewData(
  timeFilter: TimeFilter,
  year?: string
): Promise<OverviewDataType> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data based on time filter
  const mockData: Record<TimeFilter, OverviewDataType> = {
    today: {
      orders: { value: 145, growthRate: 2.5 },
      sales: { value: 1850, growthRate: 5.2 },
      revenue: { value: 185000, growthRate: 3.8 },
      products: { value: 245, growthRate: 1.2 },
      users: { value: 89, growthRate: 3.1 },
    },
    "this week": {
      orders: { value: 876, growthRate: 8.5 },
      sales: { value: 12340, growthRate: 10.3 },
      revenue: { value: 1234000, growthRate: 9.1 },
      products: { value: 1456, growthRate: 6.7 },
      users: { value: 567, growthRate: 7.2 },
    },
    "this month": {
      orders: { value: 3456, growthRate: 12.8 },
      sales: { value: 45600, growthRate: 15.2 },
      revenue: { value: 4560000, growthRate: 14.5 },
      products: { value: 5234, growthRate: 11.3 },
      users: { value: 2345, growthRate: 10.8 },
    },
    "this year": {
      orders: { value: 35678, growthRate: 18.9 },
      sales: { value: 456789, growthRate: 22.4 },
      revenue: { value: 45678900, growthRate: 20.8 },
      products: { value: 45678, growthRate: 16.2 },
      users: { value: 12456, growthRate: 15.5 },
    },
  };

  // If year is provided and different from current year, adjust data
  const currentYear = new Date().getFullYear().toString();
  if (year && year !== currentYear) {
    const yearDiff = parseInt(currentYear) - parseInt(year);
    // Simulate historical data with lower values
    const adjustmentFactor = 1 - yearDiff * 0.15;
    
    return {
      orders: {
        value: Math.floor(mockData[timeFilter].orders.value * adjustmentFactor),
        growthRate: mockData[timeFilter].orders.growthRate - yearDiff * 2,
      },
      sales: {
        value: Math.floor(mockData[timeFilter].sales.value * adjustmentFactor),
        growthRate: mockData[timeFilter].sales.growthRate - yearDiff * 2,
      },
      revenue: {
        value: Math.floor(mockData[timeFilter].revenue.value * adjustmentFactor),
        growthRate: mockData[timeFilter].revenue.growthRate - yearDiff * 2,
      },
      products: {
        value: Math.floor(mockData[timeFilter].products.value * adjustmentFactor),
        growthRate: mockData[timeFilter].products.growthRate - yearDiff * 1.5,
      },
      users: {
        value: Math.floor(mockData[timeFilter].users.value * adjustmentFactor),
        growthRate: mockData[timeFilter].users.growthRate - yearDiff * 1.5,
      },
    };
  }

  return mockData[timeFilter];
}

/* 
  BACKEND INTEGRATION GUIDE:
  
  1. Replace the fetchOverviewData function with your actual API call:
  
     export async function fetchOverviewData(timeFilter: TimeFilter, year?: string) {
       const response = await fetch(`/api/overview?period=${timeFilter}&year=${year || new Date().getFullYear()}`);
       return response.json();
     }
  
  2. Expected API response format:
     {
       "orders": { "value": 3456, "growthRate": 12.8 },
       "sales": { "value": 45600, "growthRate": 15.2 },
       "revenue": { "value": 4560000, "growthRate": 14.5 },
       "products": { "value": 5234, "growthRate": 11.3 },
       "users": { "value": 2345, "growthRate": 10.8 }
     }
  
  3. The growthRate should be the percentage change compared to the previous period:
     - "today" → compared to yesterday
     - "this week" → compared to last week
     - "this month" → compared to last month
     - "this year" → compared to last year
*/


