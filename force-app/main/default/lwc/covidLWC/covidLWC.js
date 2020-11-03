import { api, LightningElement, track } from 'lwc';



export default class CovidLWC extends LightningElement {

    

    @api global ={}
    @api countries = []
    ready = false;

    connectedCallback(){
        this.fetchData();
        setTimeout(() => { 
            this.ready = true;
            console.log('new',this.countries)
           
        }, 1000);
    }
  
 

    @api
    async fetchData(){
        let response = await fetch('https://api.covid19api.com/summary');
        if (response.ok) { 
            var json = await response.json();
            this.global = {...json.Global}
            this.countries = [...json.Countries]
            console.log(this.countries)
            this.data = this.countries
        } else {
            alert("HTTP-Error: " + response.status);
    }
}


data = [{}]
data1 = [
    {
       "Country":"Afghanistan",
       "CountryCode":"AF",
       "Slug":"afghanistan",
       "NewConfirmed":66,
       "TotalConfirmed":41334,
       "NewDeaths":1,
       "TotalDeaths":1533,
       "NewRecovered":19,
       "TotalRecovered":34258,
       "Date":"2020-10-31T06:48:19Z",
       "Premium":{
          
       }
    },
    {
       "Country":"Albania",
       "CountryCode":"AL",
       "Slug":"albania",
       "NewConfirmed":319,
       "TotalConfirmed":20634,
       "NewDeaths":3,
       "TotalDeaths":502,
       "NewRecovered":90,
       "TotalRecovered":11097,
       "Date":"2020-10-31T06:48:19Z",
       "Premium":{
          
       }
    },
    {
       "Country":"Algeria",
       "CountryCode":"DZ",
       "Slug":"algeria",
       "NewConfirmed":319,
       "TotalConfirmed":57651,
       "NewDeaths":7,
       "TotalDeaths":1956,
       "NewRecovered":379,
       "TotalRecovered":40014,
       "Date":"2020-10-31T06:48:19Z",
       "Premium":{
          
       }
    },
    {
       "Country":"Andorra",
       "CountryCode":"AD",
       "Slug":"andorra",
       "NewConfirmed":98,
       "TotalConfirmed":4665,
       "NewDeaths":2,
       "TotalDeaths":75,
       "NewRecovered":117,
       "TotalRecovered":3377,
       "Date":"2020-10-31T06:48:19Z",
       "Premium":{
          
       }
    },]

 columns = [
    { label: 'Country', fieldName: 'Country', sortable: true, },
    { label: 'NewConfirmed', fieldName: 'NewConfirmed', type: 'number', sortable: true, cellAttributes: { alignment: 'left' }, },
    { label: 'TotalConfirmed', fieldName: 'TotalConfirmed', type: 'number', sortable: true, cellAttributes: { alignment: 'left' }, },
    { label: 'NewDeaths', fieldName: 'NewDeaths', type: 'number', sortable: true, cellAttributes: { alignment: 'left' }, },
    { label: 'TotalDeaths', fieldName: 'TotalDeaths', type: 'number', sortable: true, cellAttributes: { alignment: 'left' }, },
    { label: 'NewRecovered', fieldName: 'NewRecovered', type: 'number', sortable: true, cellAttributes: { alignment: 'left' }, },
    { label: 'TotalRecovered', fieldName: 'TotalRecovered', type: 'number', sortable: true, cellAttributes: { alignment: 'left' },},
];    



defaultSortDirection = 'asc';
sortDirection = 'asc';
sortedBy;

// Used to sort the 'Age' column
sortBy(field, reverse, primer) {
    const key = primer
        ? function(x) {
              return primer(x[field]);
          }
        : function(x) {
              return x[field];
          };

    return function(a, b) {
        a = key(a);
        b = key(b);
        return reverse * ((a > b) - (b > a));
    };
}

onHandleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.data];

    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.data = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
}

}

