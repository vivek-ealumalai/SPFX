import * as angular from 'angular';
import PocController from './PocController';
import styles from '../webparts/poc/PocWebPart.module.scss';
import 'ng-office-ui-fabric';
import 'angular-ui-bootstrap';

const myapp: angular.IModule = angular.module('myPocApp', [
    'officeuifabric.core',
    'officeuifabric.components',
    'ui.bootstrap'
]);

myapp
  .controller('PocController', PocController)
  .constant ('Styles', styles);