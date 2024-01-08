import { provinces } from '@/constants/geography';
import { WeightedGraph } from './dijkstra';

const provinceAdjacency: {
  id: string;
  name: string;
  adjacent: string;
}[] = [
  { id: '1', name: 'Hà Nội', adjacent: '15,17,18,19,23,26,22' },
  { id: '2', name: 'Hồ Chí Minh', adjacent: '49,50,48,52' },
  { id: '3', name: 'Hải Phòng', adjacent: '21,24,25' },
  { id: '4', name: 'Đà Nẵng', adjacent: '34,35' },
  { id: '5', name: 'Cần Thơ', adjacent: '56,53,58,59,57,54' },
  { id: '6', name: 'Điện Biên', adjacent: '7,16' },
  { id: '7', name: 'Lai Châu', adjacent: '6,8,12' },
  { id: '8', name: 'Lào Cai', adjacent: '7,9,12' },
  { id: '9', name: 'Hà Giang', adjacent: '8,10,12,13' },
  { id: '10', name: 'Cao Bằng', adjacent: '9,14,11' },
  { id: '11', name: 'Lạng Sơn', adjacent: '10,14,15,20,21' },
  { id: '12', name: 'Yên Bái', adjacent: '7,8,9,13,16,17' },
  { id: '13', name: 'Tuyên Quang', adjacent: '9,12,14,15,17,18' },
  { id: '14', name: 'Bắc Kạn', adjacent: '10,11,13,15' },
  { id: '15', name: 'Thái Nguyên', adjacent: '1,11,13,14,18,20' },
  { id: '16', name: 'Sơn La', adjacent: '6,7,12,17,22,29' },
  { id: '17', name: 'Phú Thọ', adjacent: '1,12,13,16,18,22' },
  { id: '18', name: 'Vĩnh Phúc', adjacent: '13,15,17,1' },
  { id: '19', name: 'Bắc Ninh', adjacent: '1,20,23,24' },
  { id: '20', name: 'Bắc Giang', adjacent: '1,11,15,19,21,24' },
  { id: '21', name: 'Quảng Ninh', adjacent: '3,11,20,24' },
  { id: '22', name: 'Hòa Bình', adjacent: '1,16,17,26,28,29' },
  { id: '23', name: 'Hưng Yên', adjacent: '1,19,24,25,26' },
  { id: '24', name: 'Hải Dương', adjacent: '19,20,21,3,23' },
  { id: '25', name: 'Thái Bình', adjacent: '3,23,24,26,27' },
  { id: '26', name: 'Hà Nam', adjacent: '1,22,23,25,27,28' },
  { id: '27', name: 'Nam Định', adjacent: '25,26,28' },
  { id: '28', name: 'Ninh Bình', adjacent: '22,27,29' },
  { id: '29', name: 'Thanh Hóa', adjacent: '16,22,28,30' },
  { id: '30', name: 'Nghệ An', adjacent: '29,31' },
  { id: '31', name: 'Hà Tĩnh', adjacent: '30,32' },
  { id: '32', name: 'Quảng Bình', adjacent: '31,33' },
  { id: '33', name: 'Quảng Trị', adjacent: '32,34' },
  { id: '34', name: 'Thừa Thiên Huế', adjacent: '4,33,35' },
  { id: '35', name: 'Quảng Nam', adjacent: '4,34,36,37' },
  { id: '36', name: 'Quảng Ngãi', adjacent: '35,37,38,39' },
  { id: '37', name: 'Kon Tum', adjacent: '35,36,38' },
  { id: '38', name: 'Gia Lai', adjacent: '37,39,40,41' },
  { id: '39', name: 'Bình Định', adjacent: '36,38,40' },
  { id: '40', name: 'Phú Yên', adjacent: '38,39,41,43' },
  { id: '41', name: 'Đắk Lắk', adjacent: '38,40,42,43,44' },
  { id: '42', name: 'Đắk Nông', adjacent: '41,44,47' },
  { id: '43', name: 'Khánh Hòa', adjacent: '40,41,44,45' },
  { id: '44', name: 'Lâm Đồng', adjacent: '41,42,43,45,46,47,50' },
  { id: '45', name: 'Ninh Thuận', adjacent: '43,44,46' },
  { id: '46', name: 'Bình Thuận', adjacent: '44,45,50,51' },
  { id: '47', name: 'Bình Phước', adjacent: '42,44,48,49,50' },
  { id: '48', name: 'Tây Ninh', adjacent: '47,49,2,52' },
  { id: '49', name: 'Bình Dương', adjacent: '47,48,2,50' },
  { id: '50', name: 'Đồng Nai', adjacent: '2,49,47,44,46,51' },
  { id: '51', name: 'Bà Rịa - Vũng Tàu', adjacent: '46,50' },
  { id: '52', name: 'Long An', adjacent: '2,48,53,54' },
  { id: '53', name: 'Đồng Tháp', adjacent: '52,54,56,5' },
  { id: '54', name: 'Tiền Giang', adjacent: '52,53,55,57' },
  { id: '55', name: 'Bến Tre', adjacent: '54,57,60' },
  { id: '56', name: 'An Giang', adjacent: '53,5,58' },
  { id: '57', name: 'Vĩnh Long', adjacent: '5,54,55,59,60' },
  { id: '58', name: 'Kiên Giang', adjacent: '5,56,59,62,63' },
  { id: '59', name: 'Hậu Giang', adjacent: '5,57,58,61,62' },
  { id: '60', name: 'Trà Vinh', adjacent: '55,57,59,61' },
  { id: '61', name: 'Sóc Trăng', adjacent: '59,60,62' },
  { id: '62', name: 'Bạc Liêu', adjacent: '58,59,61,63' },
  { id: '63', name: 'Cà Mau', adjacent: '58,63' },
];

type TransportRouteNode = {
  district?: string;
  province: string;
};

export const getTransportRoutes = (
  source: {
    district: string;
    province: string;
  },
  dest: {
    district: string;
    province: string;
  }
): TransportRouteNode[] => {
  const sourceNode = {
    district: source.district,
    province: source.province,
  };

  const destNode = {
    district: dest.district,
    province: dest.province,
  };

  if (source.province === dest.province) {
    if (source.district === dest.district) return [sourceNode];
    return [sourceNode, destNode];
  }

  const sourceId = getId(source.province);
  const destId = getId(dest.province);
  if (!sourceId || !destId) {
    return [];
  }

  const graph = makeGraph();
  const provinceIds = graph.Dijkstra(sourceId, destId);

  if (!provinceIds) {
    return [];
  }

  const result: TransportRouteNode[] = [];
  for (const id of provinceIds) {
    const province = provinceAdjacency.find((province) => province.id === id);
    if (province) {
      result.push({
        province: province.name,
      });
    }
  }
  return [sourceNode, ...result, destNode];
};

function getId(input: string) {
  return provinceAdjacency.find(
    (province) => province.name === input.replace(/Thành phố |Tỉnh /g, '')
  )?.id;
}

function makeGraph() {
  const graph = new WeightedGraph();

  for (let elem of provinceAdjacency) {
    graph.addVertex(elem.id);
  }

  for (let elem of provinceAdjacency) {
    const nodes = elem.adjacent.split(',');
    for (let node of nodes) {
      graph.addEdge(elem.id, node);
    }
  }

  return graph;
}

const getGeolocation = (provinceName: string, reverseFormat?: boolean) => {
  // format: [latitude, longtitude]
  const geolocation = provinces.find((p) => p.name === provinceName)?.geolocation;

  // if (reverseFormat == true) -> convert to format: [longtitude,latitude]
  return reverseFormat ? geolocation?.split(',').reverse().join(',') : geolocation;
};

export const measureDistance = async ({
  sourceProvince,
  destProvince,
}: {
  sourceProvince: string;
  destProvince: string;
}) => {
  const sourceGeolocation = getGeolocation(sourceProvince, true);
  const destGeolocation = getGeolocation(destProvince, true);

  const url = `https://router.project-osrm.org/route/v1/car/${sourceGeolocation};${destGeolocation}?alternatives=false&steps=false&overview=false&annotations=false`;

  const res = await fetch(url);
  const data = await res.json();
  if (data.code === 'Ok') return data?.routes[0].legs[0].distance;
  else return 0;
};

export const formatDistance = (distance: number) => {
  // distance in meter
  if (distance < 1000) return `${distance}m`;
  // distance in kilometer
  return `${(distance / 1000).toFixed(3)}km`;
};
