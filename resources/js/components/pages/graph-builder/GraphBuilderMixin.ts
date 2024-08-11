import axios from 'axios';
import Vue from 'vue';

// Define a mixin for fetching data from the World Bank API
export default {
  data() {
    return {
      indicators: [
        {
          code: 'NY.GDP.MKTP.CD',
          label: 'GDP (current US$)',
          description: 'Gross Domestic Product at current market prices',
        },
        {
          code: 'NY.GDP.PCAP.CD',
          label: 'GDP per Capita (current US$)',
          description: 'Gross Domestic Product per person at current prices',
        },
        {
          code: 'FP.CPI.TOTL',
          label: 'Consumer Price Index (CPI)',
          description:
            'Measures changes in the price level of a market basket of consumer goods and services',
        },
        {
          code: 'SL.UEM.TOTL.ZS',
          label: 'Unemployment Rate (%)',
          description:
            'Percentage of the total labor force that is unemployed but actively seeking employment',
        },
        {
          code: 'FP.CPI.TOTL.ZG',
          label: 'Inflation Rate (annual %)',
          description:
            'Annual percentage change in the cost to the average consumer of acquiring a basket of goods and services',
        },
      ],
      countries: [
        { label: 'Afghanistan', value: 'AFG', selected: false },
        { label: 'Albania', value: 'ALB', selected: false },
        { label: 'Algeria', value: 'DZA', selected: false },
        { label: 'Andorra', value: 'AND', selected: false },
        { label: 'Angola', value: 'AGO', selected: false },
        { label: 'Argentina', value: 'ARG', selected: false },
        { label: 'Armenia', value: 'ARM', selected: false },
        { label: 'Australia', value: 'AUS', selected: false },
        { label: 'Austria', value: 'AUT', selected: false },
        { label: 'Azerbaijan', value: 'AZE', selected: false },
        { label: 'Bahamas', value: 'BHS', selected: false },
        { label: 'Bahrain', value: 'BHR', selected: false },
        { label: 'Bangladesh', value: 'BGD', selected: false },
        { label: 'Barbados', value: 'BRB', selected: false },
        { label: 'Belarus', value: 'BLR', selected: false },
        { label: 'Belgium', value: 'BEL', selected: false },
        { label: 'Belize', value: 'BLZ', selected: false },
        { label: 'Benin', value: 'BEN', selected: false },
        { label: 'Bhutan', value: 'BTN', selected: false },
        { label: 'Bolivia', value: 'BOL', selected: false },
        { label: 'Bosnia and Herzegovina', value: 'BIH', selected: false },
        { label: 'Botswana', value: 'BWA', selected: false },
        { label: 'Brazil', value: 'BRA', selected: false },
        { label: 'Brunei Darussalam', value: 'BRN', selected: false },
        { label: 'Bulgaria', value: 'BGR', selected: false },
        { label: 'Burkina Faso', value: 'BFA', selected: false },
        { label: 'Burundi', value: 'BDI', selected: false },
        { label: 'Cabo Verde', value: 'CPV', selected: false },
        { label: 'Cambodia', value: 'KHM', selected: false },
        { label: 'Cameroon', value: 'CMR', selected: false },
        { label: 'Canada', value: 'CAN', selected: false },
        {
          label: 'Central African Republic',
          value: 'CAF',
          selected: false,
        },
        { label: 'Chad', value: 'TCD', selected: false },
        { label: 'Chile', value: 'CHL', selected: false },
        { label: 'China', value: 'CHN', selected: false },
        { label: 'Colombia', value: 'COL', selected: false },
        { label: 'Comoros', value: 'COM', selected: false },
        {
          label: 'Congo, Democratic Republic of the',
          value: 'COD',
          selected: false,
        },
        { label: 'Congo, Republic of the', value: 'COG', selected: false },
        { label: 'Costa Rica', value: 'CRI', selected: false },
        { label: "Côte d'Ivoire", value: 'CIV', selected: false },
        { label: 'Croatia', value: 'HRV', selected: false },
        { label: 'Cuba', value: 'CUB', selected: false },
        { label: 'Cyprus', value: 'CYP', selected: false },
        { label: 'Czech Republic', value: 'CZE', selected: false },
        { label: 'Denmark', value: 'DNK', selected: false },
        { label: 'Djibouti', value: 'DJI', selected: false },
        { label: 'Dominica', value: 'DMA', selected: false },
        { label: 'Dominican Republic', value: 'DOM', selected: false },
        { label: 'Ecuador', value: 'ECU', selected: false },
        {
          label: 'Egypt, Arab Republic of',
          value: 'EGY',
          selected: false,
        },
        { label: 'El Salvador', value: 'SLV', selected: false },
        { label: 'Equatorial Guinea', value: 'GNQ', selected: false },
        { label: 'Eritrea', value: 'ERI', selected: false },
        { label: 'Estonia', value: 'EST', selected: false },
        { label: 'Eswatini', value: 'SWZ', selected: false },
        { label: 'Ethiopia', value: 'ETH', selected: false },
        { label: 'Fiji', value: 'FJI', selected: false },
        { label: 'Finland', value: 'FIN', selected: false },
        { label: 'France', value: 'FRA', selected: false },
        { label: 'Gabon', value: 'GAB', selected: false },
        { label: 'Gambia, The', value: 'GMB', selected: false },
        { label: 'Georgia', value: 'GEO', selected: false },
        { label: 'Germany', value: 'DEU', selected: false },
        { label: 'Ghana', value: 'GHA', selected: false },
        { label: 'Greece', value: 'GRC', selected: false },
        { label: 'Grenada', value: 'GRD', selected: false },
        { label: 'Guatemala', value: 'GTM', selected: false },
        { label: 'Guinea', value: 'GIN', selected: false },
        { label: 'Guinea-Bissau', value: 'GNB', selected: false },
        { label: 'Guyana', value: 'GUY', selected: false },
        { label: 'Haiti', value: 'HTI', selected: false },
        { label: 'Honduras', value: 'HND', selected: false },
        { label: 'Hungary', value: 'HUN', selected: false },
        { label: 'Iceland', value: 'ISL', selected: false },
        { label: 'India', value: 'IND', selected: false },
        { label: 'Indonesia', value: 'IDN', selected: false },
        {
          label: 'Iran, Islamic Republic of',
          value: 'IRN',
          selected: false,
        },
        { label: 'Iraq', value: 'IRQ', selected: false },
        { label: 'Ireland', value: 'IRL', selected: false },
        { label: 'Israel', value: 'ISR', selected: false },
        { label: 'Italy', value: 'ITA', selected: false },
        { label: 'Jamaica', value: 'JAM', selected: false },
        { label: 'Japan', value: 'JPN', selected: false },
        { label: 'Jordan', value: 'JOR', selected: false },
        { label: 'Kazakhstan', value: 'KAZ', selected: false },
        { label: 'Kenya', value: 'KEN', selected: false },
        { label: 'Kiribati', value: 'KIR', selected: false },
        {
          label: "Korea, Democratic People's Republic of",
          value: 'PRK',
          selected: false,
        },
        { label: 'Korea, Republic of', value: 'KOR', selected: false },
        { label: 'Kosovo', value: 'XKX', selected: false },
        { label: 'Kuwait', value: 'KWT', selected: false },
        { label: 'Kyrgyz Republic', value: 'KGZ', selected: false },
        {
          label: "Lao People's Democratic Republic",
          value: 'LAO',
          selected: false,
        },
        { label: 'Latvia', value: 'LVA', selected: false },
        { label: 'Lebanon', value: 'LBN', selected: false },
        { label: 'Lesotho', value: 'LSO', selected: false },
        { label: 'Liberia', value: 'LBR', selected: false },
        { label: 'Libya', value: 'LBY', selected: false },
        { label: 'Liechtenstein', value: 'LIE', selected: false },
        { label: 'Lithuania', value: 'LTU', selected: false },
        { label: 'Luxembourg', value: 'LUX', selected: false },
        { label: 'Madagascar', value: 'MDG', selected: false },
        { label: 'Malawi', value: 'MWI', selected: false },
      ],
      graphTypes: [
        { value: 'line', label: 'Line Chart' },
        { value: 'bar', label: 'Bar Chart' },
        { value: 'pie', label: 'Pie Chart' },
      ],
    };
  },
  methods: {
    async fetchData(
      selectedIndicator: string,
      selectedCountry: string,
      startYear: number,
      endYear: number
    ) {
      console.log({
        selectedCountry,
        selectedIndicator,
        startYear,
        endYear,
      });

      const url = `/api/data?selectedCountry=${selectedCountry}&selectedIndicator=${selectedIndicator}&startYear=${startYear}&endYear=${endYear}`;

      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
