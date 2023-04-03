import React ,{useState, useEffect}from "react";
import { SidebarWithHeader, DashboardCards } from '../components';
import Chart from 'react-apexcharts';
// things I would never do:
import { Flex } from "@chakra-ui/react";
import { bloodStorages_url } from "../utils/constants";
import axios from "axios";
import moment from "moment";
import { useBloodStorageContext } from "../context/bloodStorage_context";
import { useBloodDonateContext } from "../context/bloodDonate_context";
export default function Dashboard() {
  const [bloodO, setBLoodO]= useState([]);
  const [bloodA, setBLoodA]= useState([]);
  const [bloodB, setBLoodB]= useState([]);
  const [bloodAB, setBLoodAB]= useState([]);
  const [data, setData]= useState([]);
  const [name, setName]= useState([]);
  
  
  const [A, setA]= useState([]);
  const [B, setB]= useState([]);
  const [AB, setAB]= useState([]);
  const [O, setO]= useState([]);
  // 0,BBLood: 0,OBLood: 0,ABBLood: 0
  // const [accountList, setAccountlist] = useState({total:''});

//  const blood=[];
const {
  bloodStorages,

  fetchBloodStorages,
} = useBloodStorageContext();
// const name =[]
const {
  bloodDonates,
  bloodDonates_loading: loading,
  bloodDonates_error: error,
  fetchBloodDonates,
} = useBloodDonateContext();


   const getdata= async()=>{     

        const response = await axios.get(bloodStorages_url+'/getBlood');
       let ABLood =response.data.ABLood;
       let BBLood= response.data.BBLood;
       let OBLood =response.data.BBLood;
       let ABBLood =response.data.ABBLood;
      setBLoodA(ABLood);
      setBLoodO(OBLood);
      setBLoodAB(ABBLood);
      setBLoodB(BBLood);
      // bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o);
     
    }
   getdata();



    useEffect(()=>{
      const getdataChart =  () => {
       
        data.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o));
        
        // name.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o.name));
        // A.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o.A));
        // B.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o.B));
        // O.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o.O));
        // AB.push(bloodDonates.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).slice(0, 4).map(o => o.AB));
   
        data[0].forEach(index=> name.push(index.name));
        data[0].forEach(index=> A.push(index.A));
        data[0].forEach(index=> O.push(index.O));
        data[0].forEach(index=> AB.push(index.AB));
        data[0].forEach(index=> B.push(index.B));
    // setA(A);
    // setAB(AB);
    console.log(name)
  }

      

      getdataChart();
      },[]);

   return (
    <SidebarWithHeader>
      <DashboardCards />
      <Flex
          
            shadow='lg'
            bg='white'
            p='5'
            borderRadius='lg'
            justifyContent='center'
          >
            <Chart 
            type="bar"
            width={600}
            height={ 400}
            series={[{
              name: 'O',
              data:O
            }, {
              name: 'A',
              data: A
            }, {
              name: 'B',
              data: B
            },
            {
              name: 'AB',
              data: AB
            },]}

            options={{
             labels:name,
             title:{
                text:"Biểu đồ máu nhận 4 lần hiến máu gần nhất",
               // align:"center",
             },

             plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },

            

             dataLabels:{
                enabled:false,
                
             },
             stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'ml'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " ml"
                }
              }
            }
          }

            }
            
            />
             <Chart 
            type="donut"
            width={600}
            height={ 400}
            series={[bloodO,bloodA,bloodB,bloodAB]}

            options={{
             labels:['O','A','B','AB'],
             title:{
              text:"Biểu đồ máu còn lại theo nhóm",
               // align:"center",
             },

             plotOptions:{
             pie:{
                donut:{
                    labels:{
                        show:true,
                        total:{
                            show:true,
                            showAlways:true,
                            //  formatter: () => this+ 'đơn vị',
                            fontSize:30,
                            color: '#f90000',
                        }
                    }
                }
             }

             },

             dataLabels:{
                enabled:true,
             }


            }}
            
            />
</Flex>
        
     
    </SidebarWithHeader>
    
  );
}
