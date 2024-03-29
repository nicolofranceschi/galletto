
import { useFormContext } from "react-hook-form";
import { useFamily } from "./Section";

var days = ["GG","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
var months = ["MM","Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
var year = ["YYYY","1900", "1901", "1902", "1903", "1904", "1905", "1906", "1907", "1908", "1909", "1910", "1911", "1912", "1913", "1914", "1915", "1916", "1917", "1918", "1919", "1920", "1921", "1922", "1923", "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937", "1938", "1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];

export default function DatePicker({name}) {
    
    const { register , formState : { errors } } = useFormContext();

    const f = useFamily()

    return (
        <div className="flex flex-col w-full gap-1">
        <div className="flex flex-grow w-full gap-1">
             <select {...register(`${f}anno_${name}`, {  validate: value => value !== 'YYYY' })} >
                {year.map((year,index) => <option key={index} value={year} >{year}</option>)}
            </select>
            
            <select  {...register(`${f}mese_${name}`, { validate: value => value !== 'MM' })} >
                {months.map((month, index) => <option key={index} value={month}>{month}</option>)}
            </select>
           
            <select {...register(`${f}giorno_${name}`, { validate: value => value !== 'GG' })} >
                {days.map((day, index) => <option key={index} value={day}>{day}</option>)}
            </select>
        </div>
        {(errors[`${f}anno_${name}`] || errors[`${f}mese_${name}`] || errors[`${f}giorno_${name}`] ) && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    );
}