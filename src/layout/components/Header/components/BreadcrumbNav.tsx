import { Breadcrumb } from 'antd';
const BreadcrumbNav = () => {
  return (
    <Breadcrumb
      items={[
        {
          title: 'Home',
        },
        {
          title: 'An Application',
        },
      ]}
    />
  );
};

export default BreadcrumbNav;
