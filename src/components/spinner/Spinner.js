import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.min.css'

const Spinner = () => {
	return <Spin indicator={antIcon} style={{ margin: 'auto' }} />
}

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 80,
			color: '#9F0013',
		}}
	/>
)

export default Spinner
