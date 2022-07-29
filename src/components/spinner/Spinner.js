import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.min.css'

const Spinner = () => {
	return <Spin indicator={antIcon} />
}

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
			color: 'red',
		}}
	/>
)

export default Spinner
