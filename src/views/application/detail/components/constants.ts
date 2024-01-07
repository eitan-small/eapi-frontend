export const colorMap: Record<string, string> = {
  GET: '#4caf50',
  POST: '#fa8c16',
  PUT: '#1890ff',
  DEL: '#fa541c',
};

export const labelMap: Record<string, string> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
};

export const getRequestMethodStyle = (requestMethod: string) => {
  return {
    color: colorMap[requestMethod] || '',
  };
};

export const getRequestMethodLabel = (requestMethod: string) => {
  return labelMap[requestMethod] || '';
};
