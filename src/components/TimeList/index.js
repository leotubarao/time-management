import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TimeActions from "../../store/actions/times";

class TimeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: {},
			somaHora: [],
			totalSomaHora: ''
		};

		this.diffHours = this.diffHours.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeleteTime = this.handleDeleteTime.bind(this);
		this.catchPropsSumHoursWorked = this.catchPropsSumHoursWorked.bind(this);
	}

	completaZeroEsquerda = (numero) => {
		return (numero < 10 ? "0" + numero : numero);
	}

	isHoraInicialMenorHoraFinal = (firstTime, lastTime) => {
		let splitFirstTime = firstTime.split(':');
		let splitLastTime = lastTime.split(':');

		let hIni = parseInt(splitFirstTime[0], 10);
		let hFim = parseInt(splitLastTime[0], 10);

		if (hIni !== hFim)
			return hIni < hFim;

		let mIni = parseInt(splitFirstTime[1], 10);
		let mFim = parseInt(splitLastTime[1], 10);

		if (mIni !== mFim)
			return mIni < mFim;
	}

	diffHours(firstTime, lastTime) {
		if (!this.isHoraInicialMenorHoraFinal(firstTime, lastTime)) {
			let aux = lastTime;
			lastTime = firstTime;
			firstTime = aux;
		}

		let hIni = firstTime.split(':');
		let hFim = lastTime.split(':');

		let horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
		let minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

		if (minutosTotal < 0) {
			minutosTotal += 60;
			horasTotal -= 1;
		}

		return this.completaZeroEsquerda(horasTotal) + ":" + this.completaZeroEsquerda(minutosTotal);

	}

	async handleSubmit(event) {
		event.preventDefault();

		const time = await this.diffHours(this.state.times.firstTime, this.state.times.lastTime);

		await this.setState({ times: { ...this.state.times, diffTime: time } });

		await this.props.addTime(this.state.times);

		await this.setState({ times: {} });

		await this.catchPropsSumHoursWorked();
	};

	async catchPropsSumHoursWorked() {

		await this.setState({ totalSomaHora: '' });

		const totalSH = await this.props.times.reduce((anterior, atual) => {

			anterior = anterior === 0 ? ['00', '00'] : anterior.split(':');
			atual = atual.times.diffTime.split(':');

			let horasTotal = parseInt(anterior[0], 10) + parseInt(atual[0], 10);
			let minutosTotal = parseInt(anterior[1], 10) + parseInt(atual[1], 10);

			if (minutosTotal >= 60) {
				minutosTotal -= 60;
				horasTotal += 1;
			}

			return this.completaZeroEsquerda(horasTotal) + ":" + this.completaZeroEsquerda(minutosTotal);

		}, 0);

		await this.setState({ totalSomaHora: totalSH });

	}

	async handleDeleteTime(id, event) {
		event.preventDefault();

		await this.props.deleteTime(id);

		await this.catchPropsSumHoursWorked();
	};

	async componentDidMount() {
		await this.catchPropsSumHoursWorked();
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-row">
						<div className="col">
							<div className="form-group">
								<label for="firstTime">Início:</label>
								<input
									type="time"
									id="firstTime"
									className="form-control"
									onChange={e => this.setState({
										times: { ...this.state.times, firstTime: e.target.value }
									})}
									value={this.state.times.firstTime || ''}
								/>
							</div>
						</div>
						<div className="col">
							<div className="form-group">
								<label for="lastTime">Fim:</label>
								<input
									type="time"
									id="lastTime"
									className="form-control"
									onChange={e => this.setState({
										times: { ...this.state.times, lastTime: e.target.value }
									})}
									value={this.state.times.lastTime || ''}
								/>
							</div>
						</div>
					</div>
					<button type="submit" className="btn btn-primary mt-3">Salvar</button>
				</form>

				<table className="table mt-5">
					<thead>
						<tr>
							<th scope="col">Início</th>
							<th scope="col">Término</th>
							<th scope="col">Horas Trabalhadas</th>
							<th scope="col" className="text-right">#</th>
						</tr>
					</thead>
					<tbody>
						{this.props.times.map(({ id, times: { firstTime, lastTime, diffTime } }) => (
							<tr key={id}>
								<td>{firstTime}</td>
								<td>{lastTime}</td>
								<td>{diffTime}</td>
								<th scope="row">
									<button
										type="button"
										className="close"
										aria-label="Close"
										onClick={e => this.handleDeleteTime(id, e)}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
				<div className="mb-3">Horas trabalhadas: <strong>{this.state.totalSomaHora}</strong></div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	times: state.times
});

const mapDispatchToProps = dispatch => bindActionCreators(TimeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimeList);
